const mongoose = require('mongoose');

const stretchSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: false,
    },
    orderId: { type: Number },
    height: {
        type: Number,
        required: false,
    },
    weight: {
        type: Number,
        required: false,
    },
    kameez: {
        bustCircumference: {
            type: Number,
            required: false,
        },
        waistCircumference: {
            type: Number,
            required: false,
        },
        hipCircumference: {
            type: Number,
            required: false,
        },
        shoulderWidth: {
            type: Number,
            required: false,
        },
        kameezLength: {
            type: Number,
            required: false,
        },
        sleeveLength: {
            type: Number,
            required: false,
        },
        armholeCircumference: {
            type: Number,
            required: false,
        },
        bicepCircumference: {
            type: Number,
            required: false,
        },
        neckCircumference: {
            type: Number,
            required: false,
        },
        frontNeckDepth: {
            type: Number,
            required: false,
        },
        shoulderToWaistLength: {
            type: Number,
            required: false,
        },
        sleeveOpeningCircumference: {
            type: Number,
            required: false,
        },
    },
    shalwar: {
        waistCircumference: {
            type: Number,
            required: false,
        },
        hipCircumference: {
            type: Number,
            required: false,
        },
        thighCircumference: {
            type: Number,
            required: false,
        },
        inseamLength: {
            type: Number,
            required: false,
        },
        outseamLength: {
            type: Number,
            required: false,
        },
        ankleOpening: {
            type: Number,
            required: false,
        },
        rise: {
            type: Number,
            required: false,
        },
        crotchDepth: {
            type: Number,
            required: false,
        },
    },
    fitPreferences: {
        kameezFit: {
            type: String,
            enum: ['fitted', 'semi-fitted', 'loose',''],
            required: false,
        },
        sleeveStyle: {
            type: String,
            enum: ['full', 'three-quarter', 'half', 'sleeveless',''],
            required: false,
        },
        pantStyle: {
            type: String,
            enum: ['traditional', 'churidar', 'straight-cut',''],
            required: false,
        },
        necklineStyle: {
            type: String,
            enum: ['v-neck', 'round neck', 'boat neck', 'custom',''],
            required: false,
        },
    },
});

const StretchModel = mongoose.model('StretchData', stretchSchema);

module.exports = StretchModel;
