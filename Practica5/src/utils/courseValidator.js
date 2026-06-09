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

function validateCourseFields(body, validPropertiesInBody) {
    let validationResult = null;

    for (let property of validPropertiesInBody) {
        switch (property) {
            case "name":
                validationResult = validateName(body.name);
                if (!validationResult.validation) return validationResult;
                break;

            case "degree":
                validationResult = validateDegree(body.degree);
                if (!validationResult.validation) return validationResult;
                break;

            case "lecturer":
                validationResult = validateLecturer(body.lecturer);
                if (!validationResult.validation) return validationResult;
                break;

            case "schedule":
                validationResult = validateSchedule(body.schedule);
                if (!validationResult.validation) return validationResult;
                break;

            case "credits":
                validationResult = validateCredits(body.credits);
                if (!validationResult.validation) return validationResult;
                break;

            case "active":
                validationResult = validateActive(body.active);
                if (!validationResult.validation) return validationResult;
                break;

            default:
                console.log(`Body has a non allowed property called ${property} for course`);
                return {
                    "validation": false,
                    "message": `Body has a non allowed property called ${property} for course`
                };
        }
    }

    return {
        "validation": true,
        "message": "all validation passed"
    };
}


function validateName(name) {
    return {
        "validation": typeof name === "string" && name.trim() !== "",
        "message": "name is invalid"
    };
}

function validateDegree(degree) {
    return {
        "validation": typeof degree === "string" && degree.trim() !== "",
        "message": "degree is invalid"
    };
}

function validateLecturer(lecturer) {
    return {
        "validation": typeof lecturer === "string" && lecturer.trim() !== "",
        "message": "lecturer is invalid"
    };
}

function validateSchedule(schedule) {
    const validSchedules = ["A+", "B+", "A", "B", "C", "D", "E", "Z"];
    return {
        "validation": validSchedules.includes(schedule),
        "message": "schedule is invalid"
    };
}

function validateCredits(credits) {
    const numCredits = Number(credits);
    return {
        "validation": Number.isInteger(numCredits) && numCredits > 0 && numCredits <= 10,
        "message": "credits is invalid"
    };
}

function validateActive(active) {
    return {
        "validation": typeof active === "boolean",
        "message": "active is invalid"
    };
}