import { AbstractControl, FormControl } from '@angular/forms';

class ValidationResponse {
    [name: string]: {
        invalid: boolean;
    };
}

export const VALIDATION_CONSTANS = {
    REGEX: {
        EMAIL:
            /^(([^<>(){}\~\`\|\/\%\*\?\$\'\=\^\&\#\[\]\\.,;:!\s@"]+(\.[^-<>()\[\]\\.,!;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        PHONE: /^[0-9]{10}$/,
        ONLY_ALPHABETS_REGEX: /^[ a-zA-Z]+$/,
    },
};

export class ValidationUtil {
    public static onlyAlphabets = (control: FormControl): ValidationResponse => {
        const validationJson = { onlyAlphabets: { invalid: true } };
        const validation = ValidationUtil.validateRegex(
            new RegExp(VALIDATION_CONSTANS.REGEX.ONLY_ALPHABETS_REGEX),
            control
        );
        return validation ? {} : validationJson;
    };

    public static requiredNonSpace(control: AbstractControl): ValidationResponse {
        let validation = {};
        try {
            if (!control.value.trim()) {
                validation = {
                    requiredNonSpace: {
                        invalid: true,
                    },
                };
            }
        } catch (error) {
            validation = {
                requiredNonSpace: {
                    invalid: true,
                },
            };
        }
        return validation;
    }

    public static validateEmail = (control: FormControl): ValidationResponse => {
        const validationJson = { email: { invalid: true } };
        const validation = ValidationUtil.validateRegex(
            new RegExp(VALIDATION_CONSTANS.REGEX.EMAIL),
            control
        );
        console.log(validation ? {} : validationJson);
        return validation ? {} : validationJson;
    };

    public static validatePhone = (control: FormControl): ValidationResponse => {
        const validationJson = { phone: { invalid: true } };
        const validation = ValidationUtil.validateRegex(
            new RegExp(VALIDATION_CONSTANS.REGEX.PHONE),
            control
        );
        console.log(validation ? {} : validationJson);
        return validation ? {} : validationJson;
    };

    private static validateRegex = (
        regex: RegExp,
        control: FormControl
    ): boolean => {
        try {
            const value = control.value.toString().trim();
            console.log('value ---', regex.test(value));
            if (value && !regex.test(value)) {
                return false;
            }
        } catch (error) {
            return false;
        }
        return true;
    };
}
