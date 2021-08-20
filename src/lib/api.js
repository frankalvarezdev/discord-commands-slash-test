import axios from "axios";

export default class Links {
    /**
     * @param {string} deezerUrl Link de deezer -> solo album
     * @param {string} endpoint URL de la API
     */
    constructor(deezerUrl, endpoint) {
        this.endpoint = endpoint;
        this.deezerUrl = this.endpoint + deezerUrl;
    }
    /**
     * Retorna datos del track
     * @returns {Object} resultado
     */
    async get() {
        let result = await axios.get(this.deezerUrl);
        result = result.data;
        return result;
    }
}