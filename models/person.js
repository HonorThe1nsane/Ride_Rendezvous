module.exports = (mongoose) => {
    const Person = mongoose.model(
        'person',
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