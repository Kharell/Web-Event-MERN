const {
    getAllEvents,
    getOneEvents,
    updateEvents,
    createEvents,
    deleteEvents,
  } = require("../../../services/mongoose/events");
  
const { StatusCodes } = require("http-status-codes");
 
// create atau posting data events
const create = async (req, res, next) => { 
    try { 
        const result = await createEvents(req);

        res.status(StatusCodes.CREATED).json({
            message: "Event Created",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// get all data atau ambil semua data
const index = async (req, res, next) => { 
    try {
        const result = await getAllEvents(req);
        
        res.status(StatusCodes.OK).json({
            message: "Get all data Events",
            data: result,
        });
    } catch (err) {
        next(err);
    }       
     
};


// get data berdasarkan id
const find = async (req, res, next) => { 
    try {
        const result = await getOneEvents(req);

        res.status(StatusCodes.OK).json({
            message: "Get data berdasarkan id Events",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


// Update atau edit data events
const update = async (req, res, next) => { 
    try {
        const result = await updateEvents(req);

        res.status(StatusCodes.OK).json({
            message: "Update data Events",
            data: result,
        });
    } catch (err) {
        next(err);
    }
};


// delete data events
const destroy = async (req, res, next) => { 
    try {
        const result = await deleteEvents(req);

        res.status(StatusCodes.OK).json({
            message: `Data dengan id ${req.params.id} berhasil dihapus`,
            data: result,
        });
    } catch (err) {
        next(err);
    }
};



module.exports = {
    create,
    index,  
    find,
    update, 
    destroy,
};