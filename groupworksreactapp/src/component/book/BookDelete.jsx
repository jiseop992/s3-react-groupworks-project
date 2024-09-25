import React from 'react';

const BookDelete = ({ bookNo, onDeleteSuccess }) => {

    const handleDelete = async () => {
        if (window.confirm('예약을 삭제하시겠습니까?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8888/app/book/delete/${bookNo}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('서버 오류 발생');
                }

                onDeleteSuccess(); // 성공적으로 삭제되었을 때의 콜백 함수
            } catch (error) {
                console.error('삭제 실패:', error);
                alert('예약 삭제 실패');
            }
        }
    };

    return (
        <button onClick={handleDelete}>삭제</button>
    );
};

export default BookDelete;
