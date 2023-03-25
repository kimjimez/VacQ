const mongoose = require('mongoose')

const HospitalSchema = new mongoose.Schema({
<<<<<<< HEAD
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not more than 50 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add an address"],
  },
  district: {
    type: String,
    required: [true, "Please add a district"],
  },
  province: {
    type: String,
    required: [true, "Please add a province"],
  },
  postalcode: {
    type: String,
    required: [true, "Please add a postalcode"],
    maxlength: [5, "Postalcode can not more than 5 digits"],
  },
  tel: {
    type: String,
  },
  region: {
    type: String,
    required: [true, "Please add a region"],
  },
},{
  toJSON:{virtuals:true},
  toObject:{virtuals:true}
});



//Reverse populate with virtuals
HospitalSchema.virtual('appointments',{
  ref: 'Appointment',
  localField:'_id',
  foreignField: 'hospital',
  justOne: false
});

//Cascade delete appointments when a hospital is deleted
HospitalSchema.pre('remove', async function(next) {
  console.log(`Appointments being removed from hospital ${this._id}`);
  await this.model('Appointment').deleteMany({hospital: this._id});
  next();
=======
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name cannot be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    }, 
    postalcode: {
        type: String,
        required: [true, 'Please add a postalcode'],
        maxlength: [5, 'Postal Code cannot be more than 5 digits']
    },
    tel: {
        type: String
    },
    region: {
        type: String,
        required: [true, 'Please add a region']
    }
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
>>>>>>> 5545f80 (add VacCenter API)
});

//Cascade delete appointments when a hospital is deleted
HospitalSchema.pre('remove', async function(next) {
    console.log(`Appointments being removed from hospital ${this._id}`);
    await this.model('Appointment').deleteMany({hospital: this._id});
    next();
});

//Reverse populate with virtuals
HospitalSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'hospital',
    justOne: false
});

module.exports = mongoose.model('Hospital', HospitalSchema);