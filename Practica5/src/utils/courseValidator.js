export function validateCourseBody(body, isComplete = true) {
    const validProperties = ["name", "degree", "lecturer", "schedule", "credits", "active"];

    if (!body) {
        return { validation: false, message: "Body is required" };
    }

    const propertiesInBody = validProperties.filter(prop => body.hasOwnProperty(prop));

    if (isComplete && propertiesInBody.length !== validProperties.length) {
        return { validation: false, message: "Body is not complete for course" };
    }

    if (propertiesInBody.length === 0) {
        return { validation: false, message: "Body has no valid properties" };
    }

    return validateCourseFields(body, propertiesInBody);
}

function validateCourseFields(body, properties) {
    for (let prop of properties) {
        let result;

        switch (prop) {
            case "name":
            case "degree":
            case "lecturer":
                result = { validation: typeof body[prop] === "string" && body[prop].trim() !== "" };
                break;

            case "schedule":
                const validSchedules = ["A+", "B+", "A", "B", "C", "D", "E", "Z"];
                result = { 
                    validation: validSchedules.includes(body[prop]) 
                };
                break;

            case "credits":
                const credits = Number(body.credits);
                result = { 
                    validation: Number.isInteger(credits) && credits > 0 && credits <= 10 
                };
                break;

            case "active":
                result = { 
                    validation: typeof body.active === "boolean" 
                };
                break;

            default:
                return { validation: false, message: `Invalid property: ${prop}` };
        }

        if (!result.validation) {
            return { validation: false, message: `${prop} is invalid` };
        }
    }

    return { validation: true, message: "Validation passed" };
}