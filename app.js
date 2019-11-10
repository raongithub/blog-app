const bodyParser       = require('body-parser'),
      methodOverride   = require('method-override'),
      expressSanitizer = require('express-sanitizer'),
      mongoose         = require('mongoose'),
      express          = require('express'),
      app              = express();

// CONFIG APP & MONGOOSE
mongoose.connect('mongodb://localhost/blog-app', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
});
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(methodOverride('_method'));

// Create MONGOOSE SCHEMA / MODEL CONFIG
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {
        type: Date,
        default: Date.now,
    }
})

// Compile into the model created
let Blog = mongoose.model('Blog', blogSchema);

// RESTful ROUTES
app.get('/', (req, res) => res.redirect('/blogs'));

app.get('/blogs', (req, res) => {
    Blog.find({}, (err, blogs) => {
        if (err) {
            console.log('ERROR!');
        } else {
            res.render('index', {
                blogs: blogs,
            });
        }
    });
});

app.listen(3000, () => console.log('server started...'));