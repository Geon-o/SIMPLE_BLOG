import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import NotionApi from '@/api/NotionApi.tsx';

// API 응답에 따른 카테고리 타입 (필요시 수정)
interface Category {
  id: string;
  title: string;
  path: string;
}

interface SubCategory {
    title: string;
    FK: string;
    path: string;
}

interface Categories {
  title: String;
  path: String;
  subCategory: SubCategory[]
}

interface CategoryState {
  mainCategories: Category[];
  allSubCategories: SubCategory[];
  categories: Categories[];
  loading: boolean;
  error: Error | null;
  fetchInitialData: () => Promise<void>;
  revalidateCategories: () => Promise<void>;
}

const useCategoryStore = create(
  persist<CategoryState>(
    (set, get) => ({
      mainCategories: [],
      allSubCategories: [],
      categories: [],
      loading: false,
      error: null,
      fetchInitialData: async () => {
        if (get().mainCategories.length > 0 || get().loading) {
          return;
        }

        set({ loading: true, error: null });
        try {
          const { categoryListApi, subCategoryListApi } = NotionApi();
          
          const [mainCatsRaw, subCatsRaw] = await Promise.all([
            categoryListApi(),
            subCategoryListApi()
          ]);

          const transformedMainCategories: Category[] = mainCatsRaw.map((cat: any) => ({
            id: cat.id,
            title: cat.properties.title.title[0].plain_text,
            path: cat.properties.path.rich_text[0].plain_text,
          }));

          const transformedSubCategories: SubCategory[] = subCatsRaw.map((subCat: any) => ({
            title: subCat.properties.title.title[0].plain_text,
            FK: subCat.properties.FK.select.name,
            path: subCat.properties.path.rich_text[0].plain_text,
          }));

          const finalCategories: Categories[] = transformedMainCategories.map(mainCat => {
            const subCategoriesForThisParent = transformedSubCategories.filter(
                subCat => subCat.FK === mainCat.title
            );
            return {
                title: mainCat.title,
                path: mainCat.path,
                subCategory: subCategoriesForThisParent,
            };
          });

          set({
              mainCategories: transformedMainCategories,
              allSubCategories: transformedSubCategories,
              categories: finalCategories,
              loading: false
          });

        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },
      revalidateCategories: async () => {
        if (get().loading) {
          return; // 이미 로딩 중이면 중복 실행 방지
        }
        set({ loading: true, error: null });
        try {
          const { categoryListApi, subCategoryListApi } = NotionApi();
          
          const [mainCatsRaw, subCatsRaw] = await Promise.all([
            categoryListApi(),
            subCategoryListApi()
          ]);

          const transformedMainCategories: Category[] = mainCatsRaw.map((cat: any) => ({
            id: cat.id,
            title: cat.properties.title.title[0].plain_text,
            path: cat.properties.path.rich_text[0].plain_text,
          }));

          const transformedSubCategories: SubCategory[] = subCatsRaw.map((subCat: any) => ({
            title: subCat.properties.title.title[0].plain_text,
            FK: subCat.properties.FK.select.name,
            path: subCat.properties.path.rich_text[0].plain_text,
          }));

          const finalCategories: Categories[] = transformedMainCategories.map(mainCat => {
            const subCategoriesForThisParent = transformedSubCategories.filter(
                subCat => subCat.FK === mainCat.title
            );
            return {
                title: mainCat.title,
                path: mainCat.path,
                subCategory: subCategoriesForThisParent,
            };
          });

          set({
              mainCategories: transformedMainCategories,
              allSubCategories: transformedSubCategories,
              categories: finalCategories,
              loading: false
          });

        } catch (error) {
          set({ error: error as Error, loading: false });
        }
      },
    }),
    {
      name: 'category-storage', // 저장소에 사용될 이름
      storage: createJSONStorage(() => sessionStorage), // sessionStorage 사용
      // loading과 error 상태는 저장소에 저장하지 않도록 필터링
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !['loading', 'error'].includes(key))
        ),
    }
  )
);

export default useCategoryStore;
