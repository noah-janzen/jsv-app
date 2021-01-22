import Mongoose from 'mongoose';
import { CreateResponse, DeleteResponse } from './database/functions/responseFunctions.js';

const connectionString = "mongodb+srv://jsv-app-admin:jsvAppAdmin2021@mycluster.zrta6.mongodb.net/jsv-app?retryWrites=true&w=majority";

Mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

// CreateResponse("600a8146b5612f27e492a49a", "Kommt einfach in normalen Klamotten, ist ja kein Schütznfest, bei dem ihr eure Uniform tragen müsst...");

DeleteResponse("600a8a11bc36a83134309489");