const nodemailer = require('nodemailer');

// TODO: replace logo url with actual link when we go live
function html(href) {
  return `
    <table cellpadding="0" width="440" cellspacing="0" border="0" bgcolor="#F9F9F9" align="center" style="margin:0 auto;table-layout:fixed">
      <tbody>
        <tr>
          <td colspan="4">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tbody>
                <tr><td colspan="2" height="30"></td></tr>
                <tr>
                  <td valign="top" align="center">
                    <a href="https://www.uwoasis.com" style="display:inline-block;text-align:center" target="_blank">
                      <img src="https://github.com/rclarey/waterloooasis/raw/master/web_service/static/img/logo.png" height="30px" width="73px" border="0" alt="Waterloo Oasis">
                    </a>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" height="20"></td>
                </tr>
              </tbody>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="border-width:1px;border-color:#efefef;border-style:solid">
              <tbody>
                <tr><td height="60"></td></tr>
                <tr style="font-family:Arial,Helvetica,sans-serif;color:#666666;font-size:14px;line-height:20px;margin-top:20px">
                  <td colspan="2" valign="top" align="center" style="padding-left:40px;padding-right:40px">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff">
                      <tbody>
                        <tr>
                          <td align="center">
                            <span style="font-size:22px;line-height:24px">
                              Verify your email address
                            </span>
                          </td>
                        </tr>
                        <tr><td height="40"></td></tr>
                        <tr><td height="2" bgcolor="#E8E8E8"></td></tr>
                        <tr><td height="40"></td></tr>
                        <tr>
                          <td align="center">
                            <span style="font-size:14px;line-height:24px">
                              To get started with Waterloo Oasis you need to confirm your email address.
                            </span>
                          </td>
                        </tr>
                        <tr><td height="20"></td></tr>
                        <tr>
                          <td valign="top" width="48%" align="center">
                            <span>
                              <a href="${href}" style="display:block;width:150px;padding:10px 20px;background-color:#248bf6;color:#ffffff;border-radius:5px;text-decoration:none" target="_blank">Verify Email Address</a>
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td height="60"></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  `;
}

module.exports = async function sendVerificationEmail(to, code) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PW,
    },
  });

  const href = `https://www.uwoasis.com/verify?v=${code}`;
  await transporter.sendMail({
    to,
    from: '"Waterloo Oasis Support" <support@uwoasis.com>',
    subject: 'Please verify your email address',
    html: html(href),
  });
};
