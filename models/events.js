module.exports = (mongoose) => {
    const Event = mongoose.model(
        'event',
        mongoose.Schema(
            {
                date: String,
                time: String,
                location: String,
                organizer: String,
            },
            { timestamps: true }
        )
    );
    return Car;
};