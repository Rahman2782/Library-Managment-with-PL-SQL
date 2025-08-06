--adding book
CREATE OR REPLACE PROCEDURE add_book_sp (
  p_title IN books.title%TYPE,
  p_author IN books.author%TYPE,
  p_genre IN books.genre%TYPE,
  p_isbn IN books.isbn%TYPE,
  p_pub_year IN books.pub_year%TYPE
) AS
BEGIN
  INSERT INTO books (title, author, genre, isbn, pub_year, available)
  VALUES (p_title, p_author, p_genre, p_isbn, p_pub_year, 1);
  COMMIT;
END;


--registering user
CREATE OR REPLACE PROCEDURE add_user_sp (
  p_name IN patrons.name%TYPE,
  p_address IN patrons.address%TYPE,
  p_phone IN patrons.phone%TYPE,
  p_membership_no IN patrons.membership_no%TYPE
) AS
BEGIN
  INSERT INTO patrons (name, address, phone, membership_no)
  VALUES (p_name, p_address, p_phone, p_membership_no);
  COMMIT;
END;

--loaning book
CREATE OR REPLACE PROCEDURE loan_book_sp (
  p_book_id IN loans.book_id%TYPE,
  p_patron_id IN loans.patron_id%TYPE,
  p_loan_date IN loans.loan_date%TYPE,
  p_due_date IN loans.due_date%TYPE
) AS
  v_available NUMBER;
BEGIN
  SELECT available INTO v_available FROM books WHERE book_id = p_book_id;
  
  IF v_available = 1 THEN
    INSERT INTO loans (book_id, patron_id, loan_date, due_date)
    VALUES (p_book_id, p_patron_id, p_loan_date, p_due_date);
    
    UPDATE books SET available = 0 WHERE book_id = p_book_id;
    COMMIT;
  ELSE
    RAISE_APPLICATION_ERROR(-20001, 'Book is already loaned.');
  END IF;
END;

--returning book
CREATE OR REPLACE PROCEDURE return_book_sp (
  p_book_id IN loans.book_id%TYPE
) AS
BEGIN
  UPDATE loans SET return_date = SYSDATE WHERE book_id = p_book_id AND return_date IS NULL;
  UPDATE books SET available = 1 WHERE book_id = p_book_id;
  COMMIT;
END;
