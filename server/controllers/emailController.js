import express from 'express';

import Emails from '../models/emailModel.js';

export const saveSentEmails = async (req, res) => {
    try {

        const email = new Emails(req.body); 

        const savedEmail = await email.save(); 

        res.status(200).json({

            message: 'Email saved successfully',
            email: savedEmail 

        });

    } catch (error) {
        
        console.error('Error saving email:', error); 
        res.status(500).json({ message: 'Error saving email', error: error.message }); 

    }
    
};


export const getEmails = async (req, res) => {
    try {
        let emails;

        if (req.params.type === 'starred') {
            emails = await Emails.find({ starred: true, bin: false });
        } else if (req.params.type === 'bin') {
            emails = await Emails.find({ bin: true })
        } else if (req.params.type === 'allmail') {
            emails = await Emails.find({});
        } else if (req.params.type === 'inbox') {
            emails = [];
        } else {
            emails = await Emails.find({ type: req.params.type });
        }

        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const moveEmailsToBin = async (req, res) => {
    try {
        await Emails.updateMany({ _id: { $in: req.body }}, { $set: { bin: true, starred: false, type: '' }});
        res.status(200).json('Emails moved to bin successfully');
    } catch (error) {
        console.error('Error moving emails to bin:', error);
        res.status(500).json(error.message);
    }
};

export const toggleStarredEmail = async (req, res) => {
    try {   
        await Emails.updateOne({ _id: req.body.id }, { $set: { starred: req.body.value }})
        res.status(201).json('Value is updated');
    } catch (error) {
        res.status(500).json(error.message);
    }
};

export const deleteEmails = async (req, res) => {
    try {
        await Emails.deleteMany({ _id: { $in: req.body }});
        res.status(200).json('Emails deleted successfully');
    } catch (error) {
        console.error('Error deleting emails:', error);
        res.status(500).json(error.message);
    }
};
