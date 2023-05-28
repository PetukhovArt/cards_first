import {FieldValues, UseFormRegister} from 'react-hook-form';
import React from 'react';

type RegisterOptions = {
    register: {
        required?: boolean;
        maxLength?: number;
        minLength?: number;
        pattern?: RegExp;
        validate?: (value: string | number) => boolean | string;
    }
}
type registerType = UseFormRegister<FieldValues> & ((name: string, options?: RegisterOptions) => void);
type formInputPropsType = {
    inputName: string
    requiredName: string
    patternValue: RegExp
    patternMessage: string
    minLength: number
    minLengthPatternMessage: string
    maxLengthPatternMessage: string
    maxLength: number
    register: registerType
}
export const ReactFormInput = (props: formInputPropsType) => {
    const {register,inputName,requiredName,patternValue,
        patternMessage,minLength,minLengthPatternMessage,
        maxLengthPatternMessage,maxLength
    } = props
    return (
        <input
            {...register(inputName, {
                required: requiredName,
                pattern: {
                    value: patternValue,
                    message: patternMessage
                },
                minLength: {
                    value: minLength,
                    message: minLengthPatternMessage
                },
                maxLength: {
                    value: maxLength,
                    message: maxLengthPatternMessage
                }
            })}
        />
    )
}