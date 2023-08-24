import {ENDPOINT} from "./endpoint";
import {GET_LOGIN} from "@/repositories/api/auth/getLogin";
import * as WS from '@/repositories/api/abstractWebservice'
import axios from "axios";

export const REFRESH_JWT = () => {
    try {

        // get stored refresh jwt
        let refreshToken = null;

        // If existing, send request and store new JWT token
        if (null !== refreshToken) {
            
        } else {
            GET_LOGIN();
        }

        // send refresh

        // if not ok :


    } catch (err) {
        const error = new Error(err.message);
        error.code = 500;
        throw error;
    }
}