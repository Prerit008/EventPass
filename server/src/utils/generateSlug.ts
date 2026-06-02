import Event from "../models/Event";

const generateSlug = async (
    title: string
): Promise<string> => {
    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");

    let slug = baseSlug;

    let counter = 1;

    while (
        await Event.findOne({ slug })
    ) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
};

export default generateSlug;