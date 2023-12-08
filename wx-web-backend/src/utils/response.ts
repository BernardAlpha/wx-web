const Rep = {
  nice: (res, data) => {
    return res.json({ code: 'PLS200', data: data })
  },
  oops: (res, code: string, errmsg: string) => {
    return res.json({ code: code, errmsg: errmsg })
  }
}

export default Rep;


// PLS200  接口正常返回
// PLS450  token失效