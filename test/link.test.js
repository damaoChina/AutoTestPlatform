const l = require('../server/link');
const basic = require('../service/basic');

const auth = {odUser: 'qun_ma', odPass: 'Profero@123'};

basic.init(() => {
    l.getLinks('www.apple.com/cn', auth, (err, data) => {
        console.log(err);
        data.forEach(item => {
            if(item.status !== 'pass'){
                console.log(item);
            }
        })
    });
});