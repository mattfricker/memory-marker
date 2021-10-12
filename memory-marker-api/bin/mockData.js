const db = require('../database');
(async function() {
    let recipe = await db.Topic.create({
        name: "Recipe",
        description: "Ingredients and steps to making food"
    });
    let paleo = await db.Topic.create({
        name: "Paleo",
        description: "Foods that do not contain grains, seed oils, legumes, etc."
    });
    let codingTutorial = await db.Topic.create({
        name: "Coding Tutorial",
        description: "Content that teaches a coding concept or tool"
    });
    let javascript = await db.Topic.create({
        name: "JavaScript",
    });
    let javaa = await db.Topic.create({
        name: "Java",
    });
    
    
    let mayo = await db.Marker.create({
        title: "Avocado Oil Mayo",
        description: "Mayonnaise that uses avocado oil",
        url: "https://www.wholesomeyum.com/keto-paleo-mayo-recipe-avocado-oil",
    });
    
    mayo.addTopic(recipe.id);
    mayo.addTopic(paleo.id);
})();

