import { Transform, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsDateString,
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  Max,
  MaxLength,
  Min,
  MinDate,
  MinLength,
  registerDecorator,
  UUIDVersion,
  ValidateNested,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isNullOrUndefined } from '../utils';

type ValidationEnumOptions = {
  enum: Record<string, any>;
  required?: boolean;
};

export function IsValidEnum(opts: ValidationEnumOptions): PropertyDecorator {
  const { required = true } = opts;
  return function (target: any, propertyKey: string | symbol): void {
    IsEnum(opts.enum)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate Number is valid
 */
type ValidationDateOptions = {
  required?: boolean;
  minDate?: Date;
  maxDate?: Date;
};

export function IsValidDate(
  { required = true, maxDate, minDate }: ValidationDateOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsDateString()(target, propertyKey);
    if (minDate) MinDate(minDate)(target, propertyKey);
    if (maxDate) MinDate(maxDate)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate Number is valid
 */
type ValidationNumberOptions = {
  required?: boolean;
  min?: number;
  max?: number;
};

export function IsValidNumber(
  { required, min, max }: ValidationNumberOptions = {
    required: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsNumber()(target, propertyKey);
    Type(() => Number)(target, propertyKey);
    if (typeof min === 'number') Min(min)(target, propertyKey);
    if (typeof max === 'number') Max(max)(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate text is valid
 */
type ValidationTextOptions = {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  matches?: RegExp;
  trim?: boolean;
};

export function IsValidText(
  {
    minLength,
    maxLength,
    required = true,
    matches,
    trim = true,
  }: ValidationTextOptions = {
    required: true,
    minLength: 1,
    maxLength: 255,
    trim: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsString()(target, propertyKey);
    MinLength(minLength)(target, propertyKey);
    MaxLength(maxLength)(target, propertyKey);
    if (trim) {
      Transform(({ value }: { value: string }) => value.trim())(
        target,
        propertyKey,
      );
    }
    if (matches) Matches(matches)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate uuid is valid
 */
type ValidationUUIDOptions = {
  required?: boolean;
  version?: UUIDVersion;
};

export function IsValidUUID(
  { required = true, version }: ValidationUUIDOptions = {
    required: true,
    version: '4',
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsUUID(version)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
  };
}

/**
 * Validate object is valid
 */
type ValidationObjectOptions = {
  required?: boolean;
  object: { new (...args: any[]): any };
};

export function IsValidObject({
  object,
  required = true,
}: ValidationObjectOptions): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    ValidateNested()(target, propertyKey);
    Type(() => object)(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Valid array of number
 */
type ValidationArrayOptions<T = any> = {
  required?: boolean;
  minSize?: number;
  maxSize?: number;
  unique?: boolean;
  minValue?: number;
  maxValue?: number;
  defaults?: T[];
};

// Dont know why default value min/max size array not work here.
export function IsValidArrayNumber(
  {
    required = true,
    minSize,
    maxSize,
    unique,
    maxValue,
    minValue,
  }: ValidationArrayOptions = {
    required: true,
    unique: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsNumber({})(target, propertyKey);
    Transform(({ value }) =>
      Array.isArray(value)
        ? value.map(Number)
        : isNullOrUndefined(value)
        ? []
        : [Number(value)],
    )(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (typeof minValue === 'number')
      Min(minValue, { each: true })(target, propertyKey);
    if (typeof maxValue === 'number')
      Max(maxValue, { each: true })(target, propertyKey);
    if (required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

export function IsValidArrayString(
  { required = true, minSize, maxSize, unique }: ValidationArrayOptions = {
    required: true,
    unique: true,
  },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsString({ each: true })(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (required) IsNotEmpty({ each: true })(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Validate array of object is valid
 */
export function IsValidArrayObject(
  { maxSize, minSize, required = true, unique = true }: ValidationArrayOptions,
  object: { new (...args: any[]): any },
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsArray()(target, propertyKey);
    ValidateNested({ each: true })(target, propertyKey);
    Type(() => object)(target, propertyKey);
    if (typeof minSize === 'number') ArrayMinSize(minSize)(target, propertyKey);
    if (typeof maxSize === 'number') ArrayMaxSize(maxSize)(target, propertyKey);
    if (unique) ArrayUnique()(target, propertyKey);
    if (required) IsNotEmpty()(target, propertyKey);
    else IsOptional()(target, propertyKey);
  };
}

/**
 * Match two field
 */
export function MatchField(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'MatchField' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    const relatedValue = (args.object as any)[relatedPropertyName];
    return value === relatedValue;
  }

  // maybe we can add default message here.
}

/**
 * Require all field exist
 */
export function ExcludeAllField(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: ExcludeFieldConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'ExcludeAllField' })
export class ExcludeFieldConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const constraints = args.constraints;
    for (const keyField of constraints) {
      const relatedValue = (args.object as any)[keyField];
      if (relatedValue) return false;
    }

    return true;
  }

  // maybe we can add default message here.
}

/**
 * Require all field exist
 */
export function RequireAllField(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: RequireFieldConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'RequireAllField' })
export class RequireFieldConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const constraints = args.constraints;
    for (const keyField of constraints) {
      const relatedValue = (args.object as any)[keyField];
      if (!relatedValue) return false;
    }

    return true;
  }

  // maybe we can add default message here.
}

/**
 * Require one of fields exist
 */
export function RequireOneOf(
  property: string[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: RequireOneOfConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'RequireOneOf' })
export class RequireOneOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const constraints = args.constraints;
    for (const keyField of constraints) {
      const relatedValue = (args.object as any)[keyField];
      if (relatedValue) return true;
    }

    return false;
  }

  // maybe we can add default message here.
}

/**
 * Just one of fields exist base on value
 */
interface IJustOneOfConstraint {
  enumValue: string;
  field: string;
}
export function JustOneOfBaseOnEnum(
  property: IJustOneOfConstraint[],
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: property,
      validator: JustOneOfBaseOnEnumConstraint,
    });
  };
}
@ValidatorConstraint({ name: 'JustOneOfBaseOnEnum' })
export class JustOneOfBaseOnEnumConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, args: ValidationArguments) {
    const { constraints, object, property } = args;

    let valueExist: any;

    for (const constraint of constraints) {
      const { enumValue, field } = constraint;
      if (object[field] != null && enumValue === object[property])
        valueExist = object[field];
      if (object[field] != null && enumValue !== object[property]) return false;
    }

    if (!valueExist) return false;
    else return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `MediaType is "${
      args.object[args.property]
    }" but supply ${JSON.stringify(args.constraints)}`;
  }
}

type ValidationEnumStringOptions = {
  enum: Record<string, any>;
  required?: boolean;
  default?: string;
};

export function IsValidEnumNumber(
  opts: ValidationEnumNumberOptions,
): PropertyDecorator {
  return function (target: any, propertyKey: string | symbol): void {
    IsEnum(opts.enum)(target, propertyKey);
    if (!opts.required) IsOptional()(target, propertyKey);
    if (opts.default)
      Transform(({ value }) => value || opts.default)(target, propertyKey);
  };
}

export function IsValidEnumString(
  opts: ValidationEnumStringOptions,
): PropertyDecorator {
  const { required = true } = opts;
  return function (target: any, propertyKey: string | symbol): void {
    IsEnum(opts.enum)(target, propertyKey);
    if (!required) IsOptional()(target, propertyKey);
  };
}

type ValidationEnumNumberOptions = {
  enum: Record<string, any>;
  required?: boolean;
  default?: number;
};

type ValidationBooleanOptions = {
  required?: boolean;
  default?: boolean;
};
export function IsValidBoolean(
  opts: ValidationBooleanOptions = { required: true },
) {
  return function (target: any, propertyKey: string | symbol): void {
    if (opts.required) IsDefined()(target, propertyKey);
    else IsOptional()(target, propertyKey);

    if (typeof opts.default === 'boolean')
      Transform(() => opts.default)(target, propertyKey);
  };
}
