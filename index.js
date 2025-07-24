const expresss = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = expresss();
app.use(cors());

mongoose.connect('mongodb+srv://aniketshelar2212002:mFWTIGXDGsqutuGj@cluster0.oog4qfk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone: String,
    website: String,
    company:{
        name: String,
        slogan: String
    },
    profileImage: String,
});

const User = mongoose.model('User', UserSchema);

app.get('/users', async (req, res) => 
    {
        const users = await User.find();
        res.json(users);
    });

    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    });
