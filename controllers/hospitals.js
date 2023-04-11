const Hospital = require('../models/Hospital');
const VacCenter = require("../models/VacCenter");

//@desc     Get all hospitals
//@route    GET /api/v1/hospitals


//@access   Public
exports.getHospitals = async (req, res, next) => {
    let query;
    //Copy req.query 
    const  reqQuery = {...req.query};
    //Field to exculde
    const removeFields = ['select', 'sort', 'page','limit'];
    //Loop over remove field and delete thrm grom rqqQuery
    removeFields.forEach(params=>delete reqQuery[params]);
    console.log(reqQuery);

    //Create query string

    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match=>`$${match}`)
    query = Hospital.find(JSON.parse(queryStr)).populate('appointments');

    //Select Field
    if(req.query.select){
        const fields=req.query.select.split(',').join(' ');
        query=query.select(fields);
    }

    //Sort 
    if(req.query.sort){
        const sortBy=req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }

    //Pagination
    const page = parseInt(req.query.page,10)||1;
    const limit = parseInt(req.query.limit,0)||25;
    const startIndex = (page-1)*limit;
    const endIndex = page*limit;
    
    try {
        const total = await Hospital.countDocuments();
        query = query.skip(startIndex).limit(limit);
        //const hospitals = await Hospital.find(req.query);
        const hospitals = await query;

        //Pagination result 
        const pagination={};
        if(endIndex<total){
            pagination.next={
                page:page+1,
                limit
            }
        }

        if(endIndex>0){
            pagination.prev={
                page:page-1,
                limit
            }
        }

        res.status(200).json({ success: true, count: hospitals.length, data : hospitals });
    } catch (error) {
        res.status(400).json({ success: false });
    }
  
};

//@desc     Get sigle hopital
//@route    GET /api/v1/hospitals/:id
//@access   Public
exports.getHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital)
            return res.status(400).json({ success: false});

        res.status(200).json({ success: true, data : hospital });
    } catch (error) {
        res.status(400).json({ success: false});
    }
  
};

//@desc     Create new hopital
//@route    POST /api/v1/hospitals
//@access   Public
exports.createHospital = async (req, res, next) => {
  const hospital = await Hospital.create(req.body);
  res.status(201).json({ success: true, data: hospital });
};

//@desc     Update hopital
//@route    PUT /api/v1/hospitals/:id
//@access   Public
exports.updateHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        if (!hospital)
            return res.status(400).json({ success: false});

        res.status(200).json({ success: true, data: hospital });
    } catch (error) {
        res.status(400).json({ success: false}); 
    }
  
};

//@desc     Delete hopital
//@route    DELETE /api/v1/hospital/:id
//@access   Public
exports.deleteHospital = async (req, res, next) => {
    try {
        const hospital = await Hospital.findById(req.params.id);
        if (!hospital)
            return res.status(400).json({ success: false});
        hospital.remove();
        res.status(200).json({ success: true, data : {} });
    } catch (error) {
        res.status(400).json({ success: true });
    }
};

exports.getVacCenters = (req, res, next) => {
    VacCenter.getAll((err, data) => { 
      if (err) {
        res.status(500).send({
          message: err.message ?? "Some error occurred while retrieving Vaccine Centers.",
        });
      } else res.send(data);
    });
  };