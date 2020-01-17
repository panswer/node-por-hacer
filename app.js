// const argv = require('yargs').argv;
const argv = require('./config/yargs').argv,
    porHacer = require('./por-hacer/por-hacer'),
    colors = require('colors');
// git tag -a v1.0.0 -m "Primera version" para realizar crea un tag
// git push --tags Sube a gitHub el tag o tags
/* 
    Comandos para aplicacion de tareas por hacer
    node app crear -d "Pasear al perro"
        {_:['crear'],
        help: false,
        version: false,
        d: 'Pasear al perro',
        '$0': 'app'
        }
    node app listar
        {_:['listar'],
        help: false,
        version: false,
        '$0': 'app'
        }
    node app actualizar -d "Pasear al perro" -c true
        {_:['actualizar'],
        version: false,
        d: 'Pasear al perro',
        c: 'true',
        '$0': 'app'}
*/

/* console.log(argv); */

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'listar':
        /* console.log(porHacer.getListado()[0]); */
        let listado = porHacer.getListado();
        for (let tarea of listado) {
            console.log('=====Por Hacer======'.green);
            console.log(tarea.descripcion);
            console.log('Estado: ', tarea.completado);
            console.log('===================='.green)
        }
        break;
    case 'actualizar':
        let actualizar = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizar);
        break;
    case 'borrar':
        let borrardo = porHacer.borrar(argv.descripcion);
        console.log(borrardo);
        break;
    default:
        console.log(`Comando '${comando}' no reconocido`);
}