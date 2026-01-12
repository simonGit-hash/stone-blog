---
title: QT常用表格导出为Excel以及Excel导入表格
description: 介绍QTableWidget基础使用方法：设置行列、设置表头、合并单元格、动态插入、控件等等.
date: 2025-03-05
image: /frontend/cpp.png
minRead: 6
author:
  name: 石头
  avatar:
    src: /avatar.svg
    alt: 石头
---
## 表格导出为Excel

 - 注意：演示所用到的软件为Qt5.14.2，编译器为MinGW 64-bit，电脑必须装有office
 - 所用的类为 QAxObject，QAxObject可以实例化为一个空对象，使用它应该封装的COM对象的名称，或者使用一个指向表示现有COM对象的IUnknown的指针。如果COM对象实现了IDispatch接口，则该对象的属性、方法和事件将作为Qt属性、槽和信号可用。基类QAxBase提供了通过IUnknown指针直接访问COM对象的API。
 ***简而言之，可以通过QAxObject 来读取、修改Excel表格***
 - 在.pro中添加 QT += axcontainer
 - 添加头文件
```cpp
#include <QFileDialog> 
#include <QDesktopServices>
```
话不多说，代码搞起
# QTableWidget导出为Excel
```cpp
void MainWindow::WidgetExcalByHtml(QTableWidget *tableWidget, QString &title)
{
    QString fileName = QFileDialog::getSaveFileName(tableWidget, "保存",                                           QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation), "Excel 文件(*.xls *.xlsx)");
    if(fileName != "")
    {
        QAxObject *excel = new QAxObject;
        if(excel->setControl("Excel.Application")) //连接Excel控件
        {
            excel->dynamicCall("SetVisible (bool Visible)","false"); //不显示当前窗体
            excel->setProperty("DisplayAlerts", false); //不显示任何警告消息，如果为true那么在关闭是会出现类似"文件已修改，是否保存"的提示
            QAxObject *workBooks = excel->querySubObject("WorkBooks");//获取工作簿集合
            workBooks->dynamicCall("Add"); //新建一个工作簿
            QAxObject *workBook = excel->querySubObject("ActiveWorkBook"); //获取当前工作簿
            QAxObject *workSheet = workBook->querySubObject("Worksheets(int)", 1); //获取第一个工作表（后面的参数代表的是第几张工作表）

            int colCount = tableWidget->columnCount();
            int rowCount = tableWidget->rowCount();

            QAxObject *cell, *col;

            //标题行
            cell = workSheet->querySubObject("Cells(int, int)", 1, 1);
            cell->dynamicCall("SetValue(const QString&)", title);
            cell->querySubObject("Font")->setProperty("Size", 18);
            //调整行高
            workSheet->querySubObject("Range(const QString&)", "1:1")->setProperty("RowHeight", 30);
            //合并标题行
            QString cellTitle;
            cellTitle.append("A1:");
            cellTitle.append(QChar(colCount - 1 + 'A'));
            cellTitle.append(QString::number(1));
            QAxObject *range = workSheet->querySubObject("Range(const QString&)", cellTitle);
            range->setProperty("WrapText", true);
            range->setProperty("MergeCells", true);
            range->setProperty("HorizontalAlignment", -4108);
            range->setProperty("VertivcalAlignment", -4108);

            //列标题
            for (int i = 0; i < colCount; i++)
            {
                QString columnName;
                columnName.append(QChar(i + 'A'));
                columnName.append(":");
                columnName.append(QChar(i + 'A'));
                col = workSheet->querySubObject("Columns(const QString&)", columnName);
                col->setProperty("ColumnWidth", tableWidget->columnWidth(i)/6);
                cell = workSheet->querySubObject("Cells(int, int)", 2, i+1);
                columnName = tableWidget->horizontalHeaderItem(i)->text();
                cell->dynamicCall("SetValue(const QString&)", columnName);
                cell->querySubObject("Font")->setProperty("Bold", true);
                cell->querySubObject("Interior")->setProperty("Color", QColor(191, 191, 191));
                cell->setProperty("HorizontalAlignment", -4108);
                cell->setProperty("VertivcalAlignment", -4108);
            }

            //处理数据
            for (int i = 0; i < rowCount; i++)
            {
                for (int j = 0; j < colCount; j++)
                {
                    workSheet->querySubObject("Cells(int, int)", i + 3, j + 1)->dynamicCall(
                                "SetValue(const QString&)", tableWidget->item(i, j)? tableWidget->item(i, j)->text():"");
                }
            }

            //画框线
            QString l_range;
            l_range.append("A2:");
            l_range.append(colCount -1 + 'A');
            l_range.append(QString::number(tableWidget->rowCount() + 2));
            range = workSheet->querySubObject("Range(const QString&)", l_range);
            range->querySubObject("Borders")->setProperty("LineStyle", QString::number(1));
            range->querySubObject("Borders")->setProperty("Color", QColor(0, 0, 0));

            //调整数据区行高
            QString rowsName;
            rowsName.append("2:");
            rowsName.append(QString::number(tableWidget->rowCount() + 2));
            range = workSheet->querySubObject("Range(const QString&)", rowsName);
            range->setProperty("RowHeight", 20);
            workBook->dynamicCall("SaveAs(const QString&)", QDir::toNativeSeparators(fileName)); //保存到fileName

            workBook->dynamicCall("Close()"); //关闭工作簿
            excel->dynamicCall("Quit()"); //关闭excel
            delete  excel;
            excel = NULL;
            if ((QMessageBox::question(NULL, tr("完成"), tr("文件已导出，是否现在打开？")), QMessageBox::Yes | QMessageBox::No) == QMessageBox::Yes)
            {
                QDesktopServices().openUrl(QUrl("file:///" + QDir::toNativeSeparators(fileName)));
            }
        }
        else
        {
            QMessageBox::warning(NULL, tr("错误"), tr("未能创建 Excel 对象，请安装 Microsoft Excel。"), QMessageBox::Apply);
        }
    }
```
# QTableView导出为Excel
与QTableWidget导出Excel写法一样，只是QTableView获取行列以及获取单元格数据的方式和上面的不同，这个我在上篇博客已经提到，下面代码我在不同的地方设置了粗斜体，方便观看。
```cpp
void MainWindow::Table2ExcelByHtml(QTableView *tableView, QString &title)
{
    QString fileName = QFileDialog::getSaveFileName(tableView, "保存",                                                    QStandardPaths::writableLocation(QStandardPaths::DocumentsLocation), "Excel 文件(*.xls *.xlsx)");
    if(fileName != "")
    {
        QAxObject *excel = new QAxObject;
        if(excel->setControl("Excel.Application")) //连接Excel控件
        {
            excel->dynamicCall("SetVisible (bool Visible)","false"); //不显示窗体
            excel->setProperty("DisplayAlerts", false); //不显示任何警告消息，如果为true那么在关闭是会出现类似"文件已修改，是否保存"的提示
            QAxObject *workBooks = excel->querySubObject("WorkBooks");//获取工作簿集合
            workBooks->dynamicCall("Add"); //新建一个工作簿
            QAxObject *workBook = excel->querySubObject("ActiveWorkBook"); //获取当前工作簿
            QAxObject *workSheet = workBook->querySubObject("Worksheets(int)", 1);

            ***int colCount = tableView->model()->columnCount();
            int rowCount = tableView->model()->rowCount();***

            QAxObject *cell, *col;

            //标题行
            cell = workSheet->querySubObject("Cells(int, int)", 1, 1);
            cell->dynamicCall("SetValue(const QString&)", title);
            cell->querySubObject("Font")->setProperty("Size", 18);
            //调整行高
            workSheet->querySubObject("Range(const QString&)", "1:1")->setProperty("RowHeight", 30);
            //合并标题行
            QString cellTitle;
            cellTitle.append("A1:");
            cellTitle.append(QChar(colCount - 1 + 'A'));
            cellTitle.append(QString::number(1));
            QAxObject *range = workSheet->querySubObject("Range(const QString&)", cellTitle);
            range->setProperty("WrapText", true);
            range->setProperty("MergeCells", true);
            range->setProperty("HorizontalAlignment", -4108);
            range->setProperty("VertivcalAlignment", -4108);

            //列标题
            for (int i = 0; i < colCount; i++)
            {
                QString columnName;
                columnName.append(QChar(i + 'A'));
                columnName.append(":");
                columnName.append(QChar(i + 'A'));
                col = workSheet->querySubObject("Columns(const QString&)", columnName);
                col->setProperty("ColumnWidth", tableView->columnWidth(i)/6);
                cell = workSheet->querySubObject("Cells(int, int)", 2, i+1);
                ***columnName = tableView->model()->headerData(i, Qt::Horizontal, Qt::DisplayRole).toString();***
                cell->dynamicCall("SetValue(const QString&)", columnName);
                cell->querySubObject("Font")->setProperty("Bold", true);
                cell->querySubObject("Interior")->setProperty("Color", QColor(191, 191, 191));
                cell->setProperty("HorizontalAlignment", -4108);
                cell->setProperty("VertivcalAlignment", -4108);
            }

            //处理数据
            for (int i = 0; i < rowCount; i++)
            {
                for (int j = 0; j < colCount; j++)
                {
                    ***QModelIndex index = tableView->model()->index(i, j);
                    QString strData = tableView->model()->data(index).toString();
                    workSheet->querySubObject("Cells(int, int)", i + 3, j + 1)->dynamicCall("SetValue(const QString&)", strData);***
                }
            }

            //画框线
            QString l_range;
            l_range.append("A2:");
            l_range.append(colCount -1 + 'A');
            ***l_range.append(QString::number(tableView->model()->rowCount() + 2));***
            range = workSheet->querySubObject("Range(const QString&)", l_range);
            range->querySubObject("Borders")->setProperty("LineStyle", QString::number(1));
            range->querySubObject("Borders")->setProperty("Color", QColor(0, 0, 0));

            //调整数据区行高
            QString rowsName;
            rowsName.append("2:");
            ***rowsName.append(QString::number(tableView->model()->rowCount() + 2));***
            range = workSheet->querySubObject("Range(const QString&)", rowsName);
            range->setProperty("RowHeight", 20);
            workBook->dynamicCall("SaveAs(const QString&)", QDir::toNativeSeparators(fileName)); //保存到fileName

            workBook->dynamicCall("Close()"); //关闭工作簿
            excel->dynamicCall("Quit()"); //关闭excel
            delete  excel;
            excel = NULL;
            if ((QMessageBox::question(NULL, tr("完成"), tr("文件已导出，是否现在打开？")), QMessageBox::Yes | QMessageBox::No) == QMessageBox::Yes)
            {
                QDesktopServices().openUrl(QUrl("file:///" + QDir::toNativeSeparators(fileName)));
            }
        }
        else
        {
            QMessageBox::warning(NULL, tr("错误"), tr("未能创建 Excel 对象，请安装 Microsoft Excel。"), QMessageBox::Apply);
        }
    }
}
```
# Excel导出小结

 - 使用方法
 
```cpp
    QString fileName = "newExcel";
    WidgetExcalByHtml(ui->tableWidget, fileName);
    Table2ExcelByHtml(ui->tableView, fileName);
```

 - 常用函数
 
```cpp
QAxWidget excel("Excel.Application");

//将对象的name属性的值设置为value
bool QObject::setProperty(const char *name, const QVariant &value)

//调用COM对象的方法函数，以var形式传递参数，并返回该方法返回的值。
//如果方法没有返回值或函数调用失败，此函数将返回无效的QVariant对象。
QVariant QAxBase::dynamicCall(const char *function, QList<QVariant> &vars)

1) 显示当前窗口：
excel.setProperty("Visible", true);
2) 更改 Excel 标题栏：
excel.setProperty("Caption", "Invoke Microsoft Excel");
3) 添加新工作簿：
QAxObject * workbooks = excel.querySubObject("WorkBooks");
workbooks->dynamicCall("Add");
4) 打开已存在的工作簿：
workbooks->dynamicCall("Open (const QString&)", QString("c:/test.xls"));
5) 获取活动工作簿：
QAxObject * workbook = excel.querySubObject("ActiveWorkBook");
6) 获取所有的工作表：
QAxObject * worksheets = workbook->querySubObject("WorkSheets");
7) 获取工作表数量：
int intCount = worksheets->property("Count").toInt();
8) 获取第一个工作表：
QAxObject * worksheet = workbook->querySubObject("Worksheets(int)", 1);
9) 获取cell的值：
QAxObject * range = worksheet->querySubObject("Cells(int,int)", 1, 1 );
```

## Excel表格数据导入到QT中的表格
个人简单实现的界面，关键代码下面会介绍，如何读取Excel表格数据
![在这里插入图片描述](https://i-blog.csdnimg.cn/blog_migrate/d71c3c2fed498d380cb380a4a023ad52.png)

 1. 获取Excel表格中的workSheet
```cpp
    QString filePath = QFileDialog::getOpenFileName(
                this, QStringLiteral("选择Excel文件"), "",
                QStringLiteral("Excel file(*.xls *.xlsx)"));
    if(filePath.isEmpty()) return;

    excel = new QAxObject(this);
    excel->setControl("Excel.Application");
    excel->dynamicCall("SetVisible (bool Visible)", "false");
    excel->setProperty("DisplayAlerts", false);

    workbooks = excel->querySubObject("WorkBooks");
    workbook = workbooks->querySubObject("Open (const QString&)",filePath);

    worksheets = workbook->querySubObject("WorkSheets");
    int sheet_count = worksheets->property("Count").toInt();// 获取工作表数目

    for (int i = 1; i <= sheet_count; i++)
    {
        work_sheet = workbook->querySubObject("Sheets(int)",i);// Sheets(int)也可换为Worksheets(int)
        QString work_sheet_name = work_sheet->property("Name").toString(); // 获取工作表名称
        work_sheet_name = QString("sheet%1:").arg(i) + work_sheet_name;
        ui->sheetName->addItem(work_sheet_name);  // 这里因为项目需要，我加了个ComboBox来列举所有sheet
        /*打印出sheet表名
        QString message = QString("sheet ") + QString::number(i,10) + QString(" name:");
        qDebug()<<message<<work_sheet_name;
        */
    }
```

 2. 导入某一个sheet表

```cpp
    QString str = "";
    if(sheet_count < 0)
    {
        if(QMessageBox::warning(this, "提示", "这是一个空表格!", QMessageBox::Yes) == QMessageBox::Yes)
            return;
    }

    str = ui->sheetName->currentText();
    if(ui->sheetName->count() <= 0)
    {
        if(QMessageBox::warning(this, "提示", "请重新从文件中导入!", QMessageBox::Yes) == QMessageBox::Yes)
            return;
    }

    int index = str.mid(5, str.indexOf(":") - 5).toInt();
    qDebug() << "index===" << index;
    worksheet = workbook->querySubObject("Worksheets(int)", index);

    usedRange = worksheet->querySubObject("UsedRange");
    QAxObject *Rows = usedRange->querySubObject("Rows");
    QAxObject *Columns = usedRange->querySubObject("Columns");
    int intRows = Rows->property("Count").toInt();
    int intColumns = Columns->property("Count").toInt();
    qDebug() << "行：" << intRows << "列：" << intColumns;

    QVariant var = usedRange->dynamicCall("value");

    QVariantList varRowContents =var.toList();
    const int rowCount = varRowContents.size();

    totalLine = rowCount - 1;
    qDebug() << "rowCount" << rowCount;

    QVariantList tmp;

//将每一个sheet表格中数据按行存到importData中，这是全局的QList<QList<QVariant>>类型
    for (int i = 1; i < rowCount; i++) {
        tmp = varRowContents[i].toList();
        importData.append(tmp);
    }
//    qDebug() << importData;
    //导入结束解释释放指针
    excel->dynamicCall("Quit(void)");

    worksheet = NULL;
    usedRange = NULL;
    excel = NULL;
    workbook = NULL;
    workbooks = NULL;
```
至此，Excel表格中的数据都已经存到QList<QList<QVariant>>中了，根据自己的需求，一个个取出来写入QTableWidget和QTableView表格中，具体怎么插入，可以参照上篇博客的插入方法，细节方面如果有问题可以留言或者发我邮箱
18856496324@163.com


3.一次性导入所有sheet表

```cpp

    if(sheet_count < 0)
    {
        if(QMessageBox::warning(this, "提示", "这是一个空表格!", QMessageBox::Yes) == QMessageBox::Yes)
            return;
    }
    if(ui->sheetName->count() <= 0)
    {
        if(QMessageBox::warning(this, "提示", "请重新从文件中导入!", QMessageBox::Yes) == QMessageBox::Yes)
            return;
    }
    //将所有sheet表数据存到importData中，这是全局的QList<QList<QVariant>>类型
    for (int i = 1; i <= sheet_count; i++)
    {
        worksheet = workbook->querySubObject("Worksheets(int)", i);
        usedRange = worksheet->querySubObject("UsedRange");
        QVariant var = usedRange->dynamicCall("value");
        QVariantList varRowContents =var.toList();
        const int rowCount = varRowContents.size();
        //这一步比较关键，如果每个sheet表前几行都是你不想要的数据，可以每次去除掉那几行，然后所有sheet表行数累加，或者先修改Excel表格，将不需要的行都删除，保留自己的数据行，可以写成totalLine += rowCount;还有一点需要注意，对于某些行列合并的地方，此方法不能准确读取其正确行列位置，可能导致数据顺序出现差错
        totalLine += (rowCount - 1); 
        qDebug() <<"all impport line::" << totalLine;

        QVariantList tmp;
        //这里j代表从第几行开始将数据全部导入，个人因为项目中表格只需要从第3行开始获取数据，所有定的是3
        for (int j = 3; j < rowCount; j++) {
            tmp = varRowContents[j].toList();
            importData.append(tmp);
        }

        worksheet = NULL;
        usedRange = NULL;
    }

    ui->sheetName->clear();

    excel->dynamicCall("Quit(void)");

    excel = NULL;
    workbook = NULL;
    workbooks = NULL;

```
至此，Excel表格中的数据都已经存到QList<QList<QVariant>>中了，根据自己的需求，一个个取出来写入QTableWidget和QTableView表格中，具体怎么插入，可以参照上篇博客的插入方法，细节方面如果有问题可以留言或者发我邮箱
18856496324@163.com

# Excel导入小结

 1. 代码注意事项：代码中    excel，workbook，workbooks ， worksheet ，usedRange定义的都是全局指针对象，很多函数中调用了。使用完这些对象后要严格按照标准 delete、置NULL。
 2. Excel表格注意事项：对于上面代码所示功能，只能导入特定的表格数据，***表格不要合并，表格中数据过长设置成换行，不要延长到其他单元格，会影响读取正确性***
 3. 用QList<QList<QVariant>>类型读取到的数据格式如下：
```cpp
(QVariant(Invalid), QVariant(QString, "顶丝"), QVariant(QString, "M5*4mm（100只）"), QVariant(Invalid), QVariant(QString, "个"), QVariant(double, 0), QVariant(double, 0), QVariant(Invalid))
```
具体可查看官方文档熟悉QVariant和QList容器

## 小NULL的修行之旅
本文也是借鉴各方资源，在自己做项目后的一些总结，写得有点粗糙，希望大家不吝赐教
借鉴链接：[可参考](https://www.cnblogs.com/felix-wang/p/6281558.html)

