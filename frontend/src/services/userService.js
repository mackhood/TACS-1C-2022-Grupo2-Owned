import axios from 'axios';
import {put, get, post} from './appService';
import Config from '../appConfig.json';

const url = Config.ApiURL;

const resource='user';
const resultSubResource='results';
const tournamentsSubResource='tournaments';

export async function createUser(data){
    return axios.post(`${url}/authorization`, data);
}

export async function updateUser(data){
    return put(`${resource}/${data.id}`, data); 
}

export async function getTournaments(page, limit){
    return get(`${tournamentsSubResource}`, {
        privacy: 'PRIVATE',
        page: page,
        limit: limit
    });
}

export async function getDailyResults(){
    return get(`${resource}/${resultSubResource}`);
}

export async function updateDailyResults(userId, data){
    return put(`${resource}/${resultSubResource}`, data);
}