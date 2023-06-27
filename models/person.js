module.exports = (mongoose) => {
    const Person = mongoose.model(
        'person',
        mongoose.Schema(
            {
                // googleId: String, eventually we will need to add a googleId to the person
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