import { Injectable } from '@nestjs/common';

@Injectable()
export class StringProvider {
    public removeVietnameseAccents(text: string): string {
        const mapAccents: { [key: string]: string } = {
            à: 'a',
            á: 'a',
            ả: 'a',
            ã: 'a',
            ạ: 'a',
            ă: 'a',
            ằ: 'a',
            ắ: 'a',
            ẳ: 'a',
            ẵ: 'a',
            ặ: 'a',
            â: 'a',
            ầ: 'a',
            ấ: 'a',
            ẩ: 'a',
            ẫ: 'a',
            ậ: 'a',
            đ: 'd',
            è: 'e',
            é: 'e',
            ẻ: 'e',
            ẽ: 'e',
            ẹ: 'e',
            ê: 'e',
            ề: 'e',
            ế: 'e',
            ể: 'e',
            ễ: 'e',
            ệ: 'e',
            ì: 'i',
            í: 'i',
            ỉ: 'i',
            ĩ: 'i',
            ị: 'i',
            ò: 'o',
            ó: 'o',
            ỏ: 'o',
            õ: 'o',
            ọ: 'o',
            ô: 'o',
            ồ: 'o',
            ố: 'o',
            ổ: 'o',
            ỗ: 'o',
            ộ: 'o',
            ơ: 'o',
            ờ: 'o',
            ớ: 'o',
            ở: 'o',
            ỡ: 'o',
            ợ: 'o',
            ù: 'u',
            ú: 'u',
            ủ: 'u',
            ũ: 'u',
            ụ: 'u',
            ư: 'u',
            ừ: 'u',
            ứ: 'u',
            ử: 'u',
            ữ: 'u',
            ự: 'u',
            ỳ: 'y',
            ý: 'y',
            ỷ: 'y',
            ỹ: 'y',
            ỵ: 'y',
        };

        const normalizeText = text.normalize('NFD');
        const removedAccents = normalizeText.replace(/[\u0300-\u036f]/g, '');
        const withoutVietnameseAccents = Array.from(removedAccents)
            .map((char) => mapAccents[char] || char)
            .join('');
        // Remove dashes from the beginning and end
        return withoutVietnameseAccents
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with dashes
            .replace(/^-|-$/g, '');
    }
}
