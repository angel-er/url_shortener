const Url = require('../models/Url');

exports.home = (req, res) => {
  // const response = {message: 'Todo bien'};
  res.render('index');
};

exports.addUrl = async (req, res, next) => {
  console.log(req.body.urlOriginal);
  const urlOriginal = req.body.urlOriginal;
  let response;
  const url = new Url({urlOriginal});

  try {
    let resultado = await url.save();
    response = {
      codigo: 200,
      message: 'Almacenado Correctamente',
      url: resultado.shortUrl,
    };
  } catch (error) {
    console.log(error);
    response = {
      codigo: 400,
      error: 'Hubo un error',
    };
  }

  res.json(response);
  next();
};

// CUando el usuario visita la URL corta
exports.redirectUrl = async (req, res, next) => {
  console.log(req.params.url);
  const shortUrl = req.params.url;

  const url = await Url.findOne({shortUrl});
  console.log(url);

  if (!url) {
    res.redirect('/?error=404');
    next();
  }
  res.redirect(url.urlOriginal);
  next();
};
