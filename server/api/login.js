const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const db = require('../db/db.js')
const sha1 = require('sha1')
const rand = require('csprng');

// 创建Token jwt 轻量 简单233
// 7天过期
const creatToken = (id, name) => {
  return jwt.sign(
    {
      id: id,
      name: name
    },
    '88881234',
    {
      expiresIn: '7d'
    }
  )
};

/**
 * 查找用户并返回ToKen
 * @param name
 * @param password
 * @returns {Promise}
 */
function findUser(name, password) {
  return new Promise((resolve, reject) => {
    db.User.findOne({name: name}, (err, doc) => {
      if (err) {
        console.log(err)
      } else if (doc) {
        const salt = doc.salt;
        if (doc.password === sha1(password + salt)) {
          const token = creatToken(doc._id, doc.name);
          resolve({
            id: doc._id,
            name: doc.name,
            token: token
          })
        } else {
          reject('查询不到此用户');
        }
      }
    })
  })


}

function saveUser(name, password) {
  return new Promise((resolve, reject) => {
    db.User.findOne({name: name}, (err, doc) => {
      if (err) {
        reject('读取数据失败');
        console.log(err);
        console.log('读取数据失败')
      } else if (doc) {
        reject('用户已经存在');
        console.log('用户已经存在');

      } else {
        const salt = rand(160, 36);
        // 第一次创建站长账户
        const doc = new Models['User']({name: name, password: sha1(password + salt), salt: salt}).save();
        doc.then(
          doc=>{
            console.log(doc);
            const token = creatToken(doc._id, doc.name);
            resolve({
              id: doc._id,
              name: doc.name,
              token: token
            });
          }
        )


      }
    })

  });

}

router.get('/api/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  findUser(name, password).then(
    data => {
      res.status(200).send(data)
    }
  ).catch(
    err => {
      res.status(401).send(err)
    }
  )
});

router.post('/api/login', (req, res) => {
  const name = req.body.name;
  const password = req.body.password;
  saveUser(name, password).then(
    data => {
      res.status(200).send(data)
    }
  ).catch(
    err => {
      res.status(401).send(err)
    }
  )

});

module.exports = router;
