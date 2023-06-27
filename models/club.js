module.exports = (mongoose) => {
    const Club = mongoose.model(
        'club',
        mongoose.Schema(
            {
                name: String,
                location: String,
                president: String,
                clubMembers: String,
                president: String,
            },
            { timestamps: true }
        )
    );
    return Person;
};