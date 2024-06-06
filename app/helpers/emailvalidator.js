export function EmailValidator(email) {
    const at = email.indexOf('@')
    const dot = email.lastIndexOf('.')
    console.log('atIndex:', at, 'dotIndex:', dot);
    return at > 0 && dot > at + 1 && dot < email.length - 1;
}