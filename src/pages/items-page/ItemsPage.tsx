import React, { useState } from 'react'
import { useSearchParams, ParamKeyValuePair } from 'react-router-dom';
import { catalog } from '../../core/data/catalog.data';
import './ItemsPage.scss'
import { ItemCard } from '../../components/simple/item-card/ItemCard';
import { IItem } from '../../core/interfaces/catalog.interfaces';
import { ShopState } from '../../core/state/ShopState'
import { FilterType, SortType, ItemsQueryOptions, RangeType } from '../../core/types/tools.types';
import { IToolsProps, Tools } from '../../components/smart/tools/Tools';
import { toolsModel, ModifyItemsType } from '../../core/model/toolsModel';

interface IItemsPageProps {
    state: ShopState
}

export const ItemsPage = (props: IItemsPageProps): JSX.Element => {
    //прослушиваем url
    const [searchParams, setSearchParams] = useSearchParams();

    //получкам каталог товаров
    const catalogItems: IItem[] = [...catalog.products];
    let toolsSetting = toolsModel.toolsSetting;

    // Проверяем есть ли в url строке квери параметры, если есть то записываем их в текучие параметры и рендерим
    // меняем объект с параметрами в соответствии
    const getCurrentParams = () => {
        let isParam = searchParams.toString() !== '';
        const settings = toolsModel.resetToolsSettings(toolsSetting);
        toolsSetting = settings;
        if (isParam) {
            for (const key in toolsSetting) {
                const objKey = key as keyof ItemsQueryOptions;
                if (objKey === 'filter') {
                    const filter: FilterType = toolsSetting.filter;
                    for (const subObjKey in filter) {
                        let subKey = subObjKey as keyof FilterType;
                        const params = searchParams.get(`${subKey}`);
                        if (params !== null) {
                            toolsSetting.filter[subKey] = params;
                        }
                    }
                }
                if (objKey === 'sort') {
                    const sort: SortType = toolsSetting.sort;
                    for (const subObjKey in sort) {
                        let subKey = subObjKey as keyof SortType;
                        const params = searchParams.get(`${subKey}`) as "assent" | "descent" | null;
                        if (params !== null) {
                            toolsSetting.sort[subKey] = params;
                        }
                    }
                }
                if (objKey === 'search') {
                    const params = searchParams.get(`${objKey}`) as "assent" | "descent" | null;
                    if (params !== null) {
                        toolsSetting.search = params;
                    }
                }
                if (objKey === 'range') {
                    const range: RangeType = toolsSetting.range;
                    for (const keyInRange in range) {
                        const key = keyInRange as keyof RangeType;
                        const param = searchParams.get(`${key}`);

                        if (param !== null) {
                            const values = param.split('-');
                            const min = +values[0];
                            const max = +values[1];
                            range[key] = [min, max];
                        }
                    }
                }
            }
        }
    }
    getCurrentParams();

    //сортируем.фильтруем товары
    const modifyItems: ModifyItemsType = toolsModel.modifyItemsByParams(catalogItems, toolsSetting);
    const [prods, setProds] = useState(modifyItems.items);

    const [cardView, setCardView] = useState<'card' | 'list'>('card');
    const itemsList: JSX.Element[] = prods.map((elem) =>
        <ItemCard
            item={elem}
            view={cardView}
            state={props.state}
            setView={setCardView}
            key={elem.id}
        />);

    const SetItemsFromTools = (items: IItem[], urlParam: ParamKeyValuePair[]) => {
        setProds(items);
        setSearchParams(urlParam);
    }

    React.useEffect((): void => {
        setSearchParams(modifyItems.urlParams);
    }, [])

    return (
        <section className='catalog'>
            <div className='catalog__wrap'>
                <section className='catalog__wrap__info-wrap'>
                    <div className='catalog__wrap__info-wrap__info'>
                        <h3 className='catalog__wrap__info-wrap__info__title'>
                            Welcome to Online Store
                        </h3>
                        <p className='catalog__wrap__info-wrap__info__text'>
                            A big choice of products, for every taste and wallet.
                        </p>
                    </div>
                </section>

                <div className='catalog__wrap__total-items-count'>
                    <span>Items in page:</span>
                    <div className='catalog__wrap__total-items-count__number'>{prods.length}</div>
                    <span>from 100</span>
                </div>

                <Tools
                    items={[...catalog.products]}
                    setItems={SetItemsFromTools}
                    toolsSetting={toolsSetting}
                />

                <section className='catalog__wrap__items'>
                    <div className='catalog__wrap__items__title'>
                        Products
                        <div className='catalog__wrap__items__title__view'>
                            <button onClick={() => setCardView('card')}>
                                Card
                            </button>
                            <button onClick={() => setCardView('list')}>
                                List
                            </button>
                        </div>
                    </div>

                    <div className='catalog__wrap__items__items-wrap'>
                        {itemsList}
                    </div>
                </section>
            </div >
        </section >
    )
}
