module.exports = (mongoose) => {
    const Car = mongoose.model(
        'car',
        mongoose.Schema(
            {
                carMake: String,
                carModel: String,
                engineSize: String,
                color: String,
                year: String,
                price: String,
            },
            { timestamps: true }
        )
    );
    return Car;
};