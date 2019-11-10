const express = require('express'),
      app     = express()

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.redirect('/blogs'))

app.get('/blogs', (req, res) => res.render('index'))

app.listen(3000, () => console.log('server started...'))