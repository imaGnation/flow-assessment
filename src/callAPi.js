import { normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import _ from 'lodash';

const API_ROOT = '';

// API interaction method.
export default function callAPi(httpMethod = 'GET', endpoint, payload = {}, schema = undefined) {
    const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint;
    let request = {
        method: httpMethod,
        headers: {
            'Accept': 'application/json'
        }
    }

    if (httpMethod === "POST" && payload !== undefined) {
        Object.assign(request, {
            body: JSON.stringify(payload)
        });
    }

    return fetch(fullUrl, request)
        .then(response =>
            response.json().then(json => ({ json, response })).catch(() => {
                let errorResponsePayload = { payload: { errorStatus: response.status } };
                return Promise.reject(errorResponsePayload);
            })
        ).then(({ json, response }) => {
            if (!response.ok) {
                let errorResponsePayload = { payload: { errorStatus: response.status, message: json } };
                return Promise.reject(errorResponsePayload);
            }
            if (!_.isEmpty(schema)) {
                const camelizedJson = camelizeKeys(json);
                return Object.assign({}, normalize(camelizedJson, schema));
            } else {
                return { json, response };
            }
        });
}