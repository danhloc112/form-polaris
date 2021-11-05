import axios from 'axios'
import Raven from 'raven-js'
import { getParameterQuery } from './common/utils/helpers'
import { pick } from 'lodash'
import { getSessionToken } from '@shopify/app-bridge-utils'
axios.defaults.baseURL = process.env.MIX_APP_URL || ''
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
/**
 * Create a new Axios client instance
 * @see https://github.com/mzabriskie/axios#creating-an-instance
 */
const getClient = (baseUrl = null) => {
    const options = {
        baseURL: baseUrl ? baseUrl : process.env.MIX_APP_URL + '/api/'
    }
    options.headers = {
    }
    const params = getParameterQuery()
    options.params = params
    options.params = pick(options.params,['hmac','code','host','locale','session','shop','timestamp'])
    window.OT_SHOP = options.params.shop;
    window.OT_HMAC = options.params.hmac;

    const client = axios.create(options)
    // Add a request interceptorss
    client.interceptors.request.use(async (config) => {
        if ('forceRedirect' in params && params['forceRedirect'] == '0') {
            return config
        }
        return getSessionToken(window.app) // requires a Shopify App Bridge instance
            .then((token) => {
                // Append your request headers with an authenticated token
                config.headers["Authorization"] = `Bearer ${token}`
                return config
            })
    },
        (requestError) => {
            Raven.captureException(requestError)
            return Promise.reject(requestError)
        },
    )
    // Add a response interceptor
    client.interceptors.response.use(
        response => response,
        (error) => {
            if (error.response.status >= 500) {
                Raven.captureException(error)
            }
            return Promise.reject(error)
        },
    )
    return client
}
class ApiClient {
    constructor (baseUrl = null) {
        this.client = getClient(baseUrl)
    }
    get (url, conf = {}) {
        return this.client.get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    delete (url, conf = {}) {
        return this.client.delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    head (url, conf = {}) {
        return this.client.head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    options (url, conf = {}) {
        return this.client.options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    post (url, data = {}, conf = {}) {
        return this.client.post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    put (url, data = {}, conf = {}) {
        return this.client.put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
    patch (url, data = {}, conf = {}) {
        return this.client.patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    }
}
export { ApiClient }
/**
 * Base HTTP Client
 */
export default {
    // Provide request methods with the default base_url
    get (url, conf = {}) {
        return getClient().get(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    delete (url, conf = {}) {
        return getClient().delete(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    head (url, conf = {}) {
        return getClient().head(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    options (url, conf = {}) {
        return getClient().options(url, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    post (url, data = {}, conf = {}) {
        return getClient().post(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    put (url, data = {}, conf = {}) {
        return getClient().put(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
    patch (url, data = {}, conf = {}) {
        return getClient().patch(url, data, conf)
            .then(response => Promise.resolve(response))
            .catch(error => Promise.reject(error))
    },
}