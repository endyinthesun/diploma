import React from 'react';
import {toast} from 'react-toastify';

/**
 * Error notification
 * @param {*} msg
 * @return void
 */
const error = (msg) =>
{
  let buffer = '';

  if (typeof msg === 'object')
  {
    for (let i in msg)
    {
      buffer += `${i.charAt(0).toUpperCase() + i.substr(1, i.length)}: ${msg[i]}. `;
    }
  }
  else
  {
    buffer = msg;
  }

  toast.dismiss();
  toast.error(buffer);
};

/**
 * Success notification
 * @param {String} msg
 * @return void
 */
const success = (msg) =>
{
  toast.dismiss();
  toast.success(msg);
};

export {error, success};