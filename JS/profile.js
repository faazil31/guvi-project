const express = require('express');
const mongoose=require('mongoose')
const cors=require('cors')

const app = express();
app.use(express.json());
app.use(cors());

const connect=async()=>{
    try{
    await mongoose.connect('mongodb://127.0.0.1:27017/users')
    console.log('DB connected successfully')
    }
    catch(err)
    {
        console.error(err);
        console.log("DB Connection Error")
    }
}

connect()

const profileSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    lname: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: String,
        trim: true,
    },
    phone: {
        type: String, 
        trim: true,
        unique:false,
     
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    state: {
        type: String,
        trim: true,
    },
});

const Profile=mongoose.model('profile',profileSchema);

app.post('/profile', async (req, res) => {
    
    const data = req.body;
    try {
        const newProfile = new Profile(data);
        const result = await newProfile.save();

        console.log('Profile saved successfully:', result);
        res.status(201).json({ message: 'Profile saved successfully', profile: result });
    } catch (error) {
        console.error('Error saving profile:', error);
        res.status(500).json({ message: 'Failed to save profile', error: error.message });
    }
});

app.listen(8000, () => {
    console.log('Listening to port 8000');
});
