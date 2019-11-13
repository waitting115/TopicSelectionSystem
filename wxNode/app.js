var server = require('./server.js');
var database = require('./database.js');

server.startserver();

// database.database('user', 'create');
// let obj = {
//     myinsert: [
//         {
//           name: '王敬伟',
//           user: '17854044',
//           password: '17854044',
//           choose: '',
//           time: '',
//           chance: 1,
//           lowChoose: '',
//           lowTime: ''
//         },
//         {
//           name: '某',
//           user: '17854029',
//           password: '17854029',
//           choose: '',
//           time: '',
//           chance: 1,
//           lowChoose: '',
//           lowTime: ''
//         },
//         {
//           name: '某某',
//           user: '1',
//           password: '1',
//           choose: '',
//           time: '',
//           chance: 1,
//           lowChoose: '',
//           lowTime: ''
//         },
//         {
//           name: '某某某',
//           user: '17854022',
//           password: '17854022',
//           choose: '',
//           time: '',
//           chance: 1,
//           lowChoose: '',
//           lowTime: ''
//         },
//         {
//           name: '某某某某',
//           user: '17854033',
//           password: '17854033',
//           choose: '',
//           time: '',
//           chance: 1,
//           lowChoose: '',
//           lowTime: ''
//         },
//       ],
// }
// let objDelete = {
//     whereStrDelete: { choose : ''}
// }
// database.database('user', 'delete', objDelete);