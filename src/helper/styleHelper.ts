export function classNames(classes: Record<string, boolean | null>) {
    const toBeClasses = Object.keys(classes).map((key) =>
        classes[key] === true ? key : '',
    );
    return toBeClasses.join(' ');
}