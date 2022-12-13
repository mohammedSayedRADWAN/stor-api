const prodcutSchema=require('../models/product')

const getAllProductStatic=async(req,res)=>{
    /*const products=await prodcutSchema.find({}).select('name price').limit(1)
   res.status(200).json({products:products})*/
   const products=await prodcutSchema.find(
	{
		$and: [
			
			{
				price : { $gte :  1, $lte : 60} 
			},
			{
				rating : 4 
			},
			
		]
	}
	,{
		_id: 1,
		"count": 1
	}
);
res.status(200).json({products:products})
}

const getAllProducts=async(req,res)=>{
    const {name,featured,sort,feilds,numricFiliters}=req.query
    const queryObject={}
    if(featured){
        queryObject.featured= featured==='true'?true:false
    }
    if(name){
        
        queryObject.name= {$regex:name,$options:'i'} 
    }
    if(numricFiliters){
        const operatorMap={
            '>':'$gt',
            '<':'$lt',
            '>=':'$gte',
            '<=':'$lte',
            '=':'$e',
            
        }
        const reEX=/\b(<|>|<=|>=|=)\b/g
        let filters=numricFiliters.replace(
            reEX,
            (match)=>`-${operatorMap[match]}-`
            
        )
        console.log("filters=>>>"+filters);

        const options = ['price', 'rating'];
    filters = filters.split(',').forEach((item) => {
        //filters=price-$gt-40,rating-$gt-4
        //extract field,operator,value using split function and char(-)
      const [field, operator, value] = item.split('-');
      // cheac first if value added by uswer exist in my options which i specified it
      if (options.includes(field)) {
        // then add new property(field) to object called(queryObject) and pass this value [operator]: Number(value)
        queryObject[field] = { [operator]: Number(value) };
      }
    });
    console.log("filters=>>>"+filters);


    }
   /* if(price){
        queryObject.price= price
    }
    if(company){
        queryObject.company= company
    }*/
    let result=prodcutSchema.find(queryObject)
    if(sort)
    {
        const sortList=sort.split(',').join(' ');
        result=result.sort(sortList)
    }
    if(feilds){
        const feildList=feilds.split(',').join(' ');
        result=result.select(feildList)
    }
    else{
        result.sort('creatAt')
    }
    console.log(queryObject);
    const products=await result
    res.status(200).json({products,length:products.length})
}

module.exports={
    getAllProductStatic,
    getAllProducts,
}
    