import cheerio from 'cheerio';
// import iconv from 'iconv-lite';
import request from 'request';

import { Author, Literary } from '../api/models/';
import { env } from '../env';

// import charset = require('charset');

// import { Literary } from '../api/models';

// const delay = (ms: number) => {
//     return new Promise( resolve => setTimeout(resolve, ms) );
// };
const apiUrl: string = env.app.url.api;

interface LiterarySubJSON {
    title: string;
    sort_num: number;
    cnt: number;
}

interface LiteraryJSON {
    genre: number;
    title: string;
    intro: string;
    code: string;
    author_id: string;
    author_name: string;
    sub_category: string;
    cnt: number;
    literary_sub: LiterarySubJSON[];
}

const sleep = (ms: number) => {
    return new Promise( resolve => setTimeout(resolve, ms) );
};

const pushData = async (data: LiteraryJSON) => {
    const log = console.log;
    // log('확인!!!!' + JSON.stringify(data));
    /**
     * 회사확인
     * 장르확인
     * 작가확인
     * 작품확인
     * 작품회차확인
     */
    // 회사코드 확인
    // 장르코드 확인
    // 작가확인
    try {
        const author: Author = (await doRequest({
            url: apiUrl + '/Author',
            method: 'POST',
            json: true,
            body: {
                id: data.author_id,
                companyCode: 'C010',
                name: data.author_name,
            }})) as Author;

        log('return author : ' + author);

        const literary: Literary = (await doRequest({
            url: apiUrl + '/Literary',
            method: 'POST',
            json: true,
            body: {
                name: data.title,
                introduce: data.intro,
                totCnt: data.cnt,
                companyCode: 'C010',
                companyLiteraryPk: data.code,
                authorId: author.id,
                genreCode: data.genre,
            }})) as Literary;
        log('return literary : ' + literary);

    } catch (error) {
        log('error : ' + error);
    }
};

const doRequest = (options) => {
    return new Promise((resolve, reject) => {
        request(options, (err, res, body) => {
            if (!err && res.statusCode === 200) {
                resolve(body);
            } else {
                reject(err);
            }
        });
    });
};

const joaraSubScrap = (data: LiteraryJSON)  => {
    const url = 'http://www.joara.com/literature/view/book_intro.html';
    request.get({url, qs : {book_code : data.code}}, (err, res, body) => {
        if ( !err && res.statusCode === 200  ) {
            const $: any = cheerio.load(body, {decodeEntities: false});

            const title: string = $('section.series_work_area div.work_info_box div.subject span.work_tit a').attr('title');
            const intro: string = $('section.series_work_area p.work_intro.tab_content').text().trim();

            data.title = title;
            data.intro = intro;
            let chapter_title = '';
            $('form#buyForm table.tbl_work tbody tr').each((index, elem) => {
                const sub_data: LiterarySubJSON = {title: '', sort_num: 0, cnt: 0};
                const sub_title: string = $(elem).children('td.chapter_title').text();
                if (sub_title !== undefined && sub_title !== '') {
                    chapter_title = sub_title.trim();
                }
                sub_data.sort_num = Number($(elem).children('td.chapter_cell').eq(0).text().trim().replace('회', ''));
                sub_data.cnt = Number($(elem).children('td.chapter_cell').eq(3).text().trim().replace(',', ''));
                data.cnt += sub_data.cnt;
                sub_data.title = chapter_title;
                data.literary_sub.push(sub_data);
            });
            pushData(data);
        }
    });
};

export const joaraScrap = async () => {
    // const log = console.log;
    // let data: Literary[];
    const __category = ['series', 'nobless', 'premium'];
    for (let category = 0; category < 3; category++) {
        const sub_category = __category[category];
        for (let genre = 1; genre <= 23; genre++) {
            const req = request.defaults({jar: true});
            const j = request.jar();
            j.setCookie(req.cookie('best_favor_genre=' + genre), 'http://www.joara.com');
            for (let i = 1; i <= 5; i++) {
                const url = 'http://www.joara.com/best/today_best_list.html?page_no=' + i + '&sl_subcategory=series';
                req(url, {
                    method: 'GET',
                    jar: j,
                    qs: {
                        page_no: i,
                        sl_subcategory: sub_category,
                    },
                    // headers: {
                    //     'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                    //     'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
                    // },
                }, async (err, res, body) => {
                    if  ( !err && res.statusCode === 200  ) {
                        // const enc = charset(res.headers, body);
                        // const iBody = iconv.decode(body, enc);
                        // log('테스트중입니다 : ' + body);
                        const $: any = cheerio.load(body, {decodeEntities: false});
                        const eData: LiteraryJSON[] = [];
                        $('table.tbl_list tbody tr').each(async (index, elem) => {

                            const literary = $(elem).children('td.book_data_intro_form.subject_long');
                            if (literary.text() !== undefined && literary.text() !== '') {
                                const author = $(elem).children('td.author').children('span.name').children('span.member_nickname');
                                const author_id = author.attr('member_id').trim();
                                const author_name = author.text().trim();
                                // log('log literary.text - ' + literary.text());
                                const literary_href = literary.children('a').attr('href');
                                const code = literary_href.replace('/literature/view/book_intro.html?book_code=', '');
                                // const dummy = literary.children('a').children('strong').text();
                                // const literary_title = literary.children('a').text().replace(dummy, '').trim();
                                // const literary_intro = literary.children('.book_data_intro').text().trim();
                                // const literary_cnt = $(elem).children('td.num2').eq(3).text();
                                // log('-----------------' + (index + 1));
                                // log('author.id : ' + author_id);
                                // log('author.name : ' + author_name);
                                // log('literary.href : ' + literary_href);
                                // log('literary.code : ' + literary_code);
                                // log('literary.dummy : ' + dummy);
                                // log('literary.title : ' + literary_title);
                                // log('literary.intro : ' + literary_intro);
                                // log('literary.cnt : ' + literary_cnt);
                                const data: LiteraryJSON = {
                                    intro: '',
                                    title: '',
                                    code,
                                    genre,
                                    sub_category,
                                    literary_sub: [],
                                    author_id,
                                    author_name,
                                    cnt: 0,
                                };
                                eData.push(data);
                            }
                        });
                        eData.forEach(e => {
                            joaraSubScrap(e);
                            sleep(500);
                        });
                    }
                });
                await sleep(10000);
            }
        }
    }
};
