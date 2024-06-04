import React, { useEffect, useState } from "react";
import Input from "../../components/Form/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Form, { FormMessage } from "../../components/Form/Form";
import ManagementService from "services/managementService";
import BookSchema from "components/Schemas/BookSchema";
import { BookFormCreate } from "types/book";
import SearchComponent, { SearchItem } from "components/Form/Search";
import { Author } from "types/author";
import Table, { StringOrNumber, TableProps } from "components/Table/Table";

const managementService = new ManagementService();

const BookForm: React.FC = () => {
  const messageInitialState = { value: "", isError: false };
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<FormMessage>(messageInitialState);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [authorsSearchList, setAuthorsSearchList] = useState<SearchItem[]>([]);
  const [addedAuthors, setAddedAuthors] = useState<Author[]>([]);

  const {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm({ resolver: yupResolver(BookSchema) });

  useEffect(() => {
    loadAuthors();
  }, []);

  useEffect(() => {
    loadAuthorsSearchList();
  }, [authors]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadAuthors();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const loadAuthors = async () => {
    const authors = await managementService.getAuthors();

    setAuthors(authors);
  };

  const onSubmit: SubmitHandler<BookFormCreate> = async (data: BookFormCreate) => {
    setIsLoading(true);
    data.authors = addedAuthors.map((author) => ({
      existentAuthorId: author.id,
    }));
    const book = await managementService.createBook(data);

    if (book) onReset();

    setMessage({
      value: book ? "Book created with success" : "It wasn't possible to create the book, try again",
      isError: book === undefined,
    });

    setIsLoading(false);
  };

  const onReset = () => {
    setMessage(messageInitialState);
    reset(undefined);
    setAddedAuthors([]);
    loadAuthorsSearchList();
  };

  const handleOnSelectSearchedAuthor = (authorId: number) => {
    const author = authors.find((author) => author.id === authorId);
    if (!author) return;

    const searchListWithoutSelectedAuthor = authorsSearchList.filter((item) => item.value !== author.id);
    setAddedAuthors([...addedAuthors, author]);
    setAuthorsSearchList(searchListWithoutSelectedAuthor);
  };

  const renderAddedAuthorsTable = () => {
    const tableProps: TableProps = {
      tableHeaders: ["Name", "Nationality", "Birth date"],
      tableColumns: [],
      actions: [{ label: "Delete", onClick: onDeleteSelectedAuthor }],
      metaData: [],
    };

    addedAuthors.forEach(({ name, nationality, birthDate, id }: Author) => {
      tableProps.tableColumns.push([name, nationality, birthDate || ""]);
      tableProps.metaData.push({ id });
    });

    return (
      <div className="col-span-12">
        <h1 className="text-base font-semibold leading-7 text-gray-900">Book&apos;s Authors</h1>
        <hr className="mb-4" />
        <Table {...tableProps} />
      </div>
    );
  };

  const onDeleteSelectedAuthor = (rowData: Array<StringOrNumber>, metaData?: Record<string, unknown>) => {
    const filteredAuthors = addedAuthors.filter((author) => author.id !== metaData?.["id"]);

    setAddedAuthors(filteredAuthors);
    setAuthorsSearchList([...authorsSearchList, { label: String(rowData[0]), value: metaData?.["id"] }]);
  };

  const loadAuthorsSearchList = () => {
    const searchList = authors.map((author) => ({
      label: author.name,
      value: author.id,
    }));

    setAuthorsSearchList(searchList);
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      onReset={onReset}
      title="Book Creation"
      description="Enter the book details"
      message={message}
      isLoading={isLoading}
    >
      <>
        <div className="col-span-12">
          <Input label="Book title" name="title" register={register} errorMessage={errors.title?.message} />
        </div>

        <div className="col-span-12">
          <Input
            label="Number of pages"
            name="pages"
            type="number"
            register={register}
            errorMessage={errors.pages?.message}
          />
        </div>
        <div className="col-span-12">
          <SearchComponent
            name="search_author"
            searchLabel="Search for author"
            items={authorsSearchList}
            onClick={handleOnSelectSearchedAuthor}
          />
          <div className="sm:col-span-12 mt-2">
            Didn&apos;t find the author? Click&nbsp;
            <a
              href="/authors/create"
              target="_blank"
              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            >
              here
            </a>
            &nbsp;to add one
          </div>
        </div>
        {addedAuthors?.length > 0 && renderAddedAuthorsTable()}
      </>
    </Form>
  );
};

export default BookForm;
