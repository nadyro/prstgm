import express = require("express");
import cors from "cors";
import cookieParser from 'cookie-parser';
import * as bodyParser from "body-parser";
import {api} from './routes/api.route';
import {sockets} from '../sockets/socket';

console.log(process.env.NODE_ENV);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use('/api', api);
app.use(express.static(__dirname + '/dist/prostagma'));
const server = app.listen(8083, () => {
  console.log('listening...');
});
sockets(server);

