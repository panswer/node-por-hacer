const fs = require('fs');

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    fs.writeFile('DB/data.json', data, err => {
        if (err) {
            throw new Error('No se pudo grabar ', err);
        }
    });
}

const cargarDB = () => {
    try {
        listadoPorHacer = require('../DB/data.json');
    } catch (err) {
        listadoPorHacer = [];
    }
    /* console.log(listadoPorHacer); */
}

const crear = descripcion => {
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    }
    listadoPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listadoPorHacer
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB()
        return true;
    } else {
        return false;
    }
}

const borrar = descripcion => {
    cargarDB();
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
    if (nuevoListado === listadoPorHacer) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }
    /* // Mi codigo
    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    } */
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}