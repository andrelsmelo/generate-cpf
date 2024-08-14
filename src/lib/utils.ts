export function generateCPF(): string {
    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf.push(randomInt(0, 9));
    }

    let d1 = 0, d2 = 0;
    for (let i = 0; i < 9; i++) {
        d1 += cpf[i] * (10 - i);
        d2 += cpf[i] * (11 - i);
    }
    d1 = (d1 % 11) < 2 ? 0 : 11 - (d1 % 11);
    d2 = d2 + d1 * 2;
    d2 = (d2 % 11) < 2 ? 0 : 11 - (d2 % 11);

    cpf.push(d1);
    cpf.push(d2);

    return `${cpf[0]}${cpf[1]}${cpf[2]}.${cpf[3]}${cpf[4]}${cpf[5]}.${cpf[6]}${cpf[7]}${cpf[8]}-${cpf[9]}${cpf[10]}`;
}