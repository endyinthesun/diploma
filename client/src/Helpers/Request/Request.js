import React from 'react';
import * as Toast from '../Toast';

/**
 * Send GET query
 * @param {String} url
 * @param {Boolean} show_error
 * @return {Promise<Response>}
 */
const sendGetQuery = (url, show_error = true) =>
{
  return fetch(url, {
    method: 'GET'
  })
    .then(response =>
    {
      if (response.status === 200)
      {
        return response.json();
      }
      else if (response.status === 401)
      {
        window.location.replace('/#/login');
      }
      else
      {
        throw response.status;
      }
    })
    .then(content =>
    {
      if (content['error'] === 1 && show_error === true)
      {
        throw content['msg'];
      }
      else
      {
        return content;
      }
    })
    .catch((e) =>
    {
      if (show_error === true)
      {
        Toast.error(e);
      }
    });
};

/**
 * Send POST query
 * @param {String} url
 * @param {FormData} data
 * @param {Boolean} show_error
 * @return {Promise<Response>}
 */
const sendPostQuery = (url, data, show_error = true) =>
{
  return fetch(url, {
    method: 'POST',
    body: data
  })
    .then(response =>
    {
      if (response.status === 200)
      {
        return response.json();
      }
      else if (response.status === 401)
      {
        window.location.replace('/#/login');
      }
      else
      {
        throw response.status;
      }
    })
    .then(content =>
    {
      if (content['error'] === 1 && show_error === true)
      {
        throw content['msg'];
      }

      return content;
    })
    .catch((e) =>
    {
      if (show_error === true)
      {
        Toast.error(e);
      }
    });
};

export {sendGetQuery, sendPostQuery};