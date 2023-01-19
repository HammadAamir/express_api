const express = require('express')
const mobiles = require('../../models/Mobile.js');
const mobile = require('../../models/Mobile.js');
const router = express.Router();

router.get('/', (req, res) => {
    res.json(mobiles);
});
router.get('/:id', (req, res) => {
    const found = mobiles.some(mobile => mobile.id == parseInt(req.params.id));
    if(found){
        res.json(mobiles.filter(mob => mob.id == parseInt(req.params.id)));
    }else{
        res.status(400).json({msg: 'No mobile found with this id'});
    }
    
});
router.post('/', (req, res) => {
    const newMobile = {
        id: mobiles[mobiles.length - 1].id + 1,
        brand: req.body.brand,
        name: req.body.name,
        price: req.body.price
    }
    if(!newMobile.brand || !newMobile.name || !newMobile.price){
        console.log('here')
        return res.status(400).json({msg: "Please enter brand, name and price"});
    }
    mobiles.push(newMobile);
    res.json(mobiles);
});

// Update
router.put('/:id', (req, res) => {
    const found = mobiles.some(mobile => mobile.id == parseInt(req.params.id));
    if(found){
        const updateMobile = req.body;
        mobiles.forEach(mobile => {
            if(mobile.id == parseInt(req.params.id)){
                mobile.brand = updateMobile.brand ? updateMobile.brand : mobile.brand;
                mobile.name = updateMobile.name ? updateMobile.name : mobile.name;
                mobile.price = updateMobile.price ? updateMobile.price : mobile.price;
                
                res.json({msg: 'Mobile updated', mobile})
            }
        });
    }else{
        res.status(400).json({msg: 'No mobile found with this id'});
    }
});

// Delete

router.delete('/:id', (req, res) => {
    const found = mobiles.some(mobile => mobile.id == parseInt(req.params.id));
    if(found){
        mobiles.splice(parseInt(req.params.id) - 1, 1);
        res.json({
            msg: 'mobile deleted',
            mobiles: mobiles.filter(mob => mob.id !== parseInt(req.params.id) && mob != null)
        });
    }else{
        res.status(400).json({msg: 'No mobile found with this id'});
    }
    
});

module.exports = router;