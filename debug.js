const XLSX = require ('xlsx')
const NightMare = require('nightmare')
const path = require('path')
const asu = path.join(__dirname, 'manis.xlxs')
const workBook = XLSX.readFile('manis.xlsx')
const dataExcel = XLSX.utils.sheet_to_json(workBook.Sheets["Sheet1"])
console.log(dataExcel)
console.log(dataExcel[0].username)
const username = 'rahasia6346'
const password = 'rahasia123'

const nigghtmare = NightMare({
  show: true,
  waitTimeout: 360000,
  gotoTimeout: 360000,
  loadTimeout: 360000,
  executionTimeout: 360000,
  webPreferences: {
    partition: "nopersist",
  },
});

nigghtmare
  .goto("https://www.instagram.com/")
  .wait("input[name=username]")
  .insert("input[name=username]", username)
  .insert("input[name=password]", password)
  .click('button[type="submit"]')
  .wait('input[placeholder=Search]');


let value = 0
sendMessage = () => {
    nigghtmare.goto("https://www.instagram.com/" + dataExcel[value].username).exists('h2[class="rkEop"]').then((result) => {
        value++;
        if(result) {
            console.log("akun private")
            sendMessage()
        } else {
            console.log("masuk pak eko....")
            return nigghtmare
              .wait(3000)
              .evaluate(() => {
                document.getElementsByTagName("button")[0].click();
              })
              .wait(3000)
              .exists('button[class="sqdOP  L3NKy _4pI4F   _8A5w5     "]')
              .then((cek) => {
                  if(cek) {
                      return nigghtmare
                        .click(
                          'button[class="sqdOP  L3NKy _4pI4F   _8A5w5     "]'
                        )
                        .wait('textarea[placeholder="Message..."]')
                        .type('textarea[placeholder="Message..."]', "hai manisssss")
                        .type('textarea[placeholder="Message..."]','\u0000d')
                        .then(() => {
                            sendMessage()
                        })
                  } else {
                      return nigghtmare
                        .wait('textarea[placeholder="Message..."]')
                        .type(
                          'textarea[placeholder="Message..."]',
                          "hai manisssss"
                        )
                        .type('textarea[placeholder="Message..."]', "\u0000d")
                        .then(() => {
                          sendMessage();
                        });
                  }
              }).catch(err => {
                  console.log(err.message)
              })

        }
    })
}
sendMessage()
