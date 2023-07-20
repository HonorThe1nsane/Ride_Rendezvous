module.exports = (mongoose) => {
    const Person = mongoose.model(
        'persons',
        mongoose.Schema(
            {
                firstName: String,
                lastName: String,
                email: String,
                birthday: String,
                city: String,
                state: String,
            },
            { timestamps: true }
        )
    );
    return Person;
};