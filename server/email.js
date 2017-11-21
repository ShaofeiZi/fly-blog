const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
    service: 'qq',
    auth: {
        user: 'zishaofei@qq.com',
        pass: 'hygnoukkczrpbefb'                    //授权码,通过QQ获取  
    }
})

exports.send = function (to, subject, html, res) {
    const mailOptions = {
        from: '"博客小管家" <zishaofei@qq.com>',     // 发送者  
        to: to,                                     // 接受者,可以同时发送多个,以逗号隔开  
        subject: subject,                           // 标题  
        html: html                                  // html
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
            res.status(504).end("通知邮件发送失败")
        } else {
            console.log("Message sent: " + info.response)
        }
    })
}
